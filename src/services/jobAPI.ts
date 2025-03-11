interface JobResult {
  id: string;
  title: string;
  description: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
  };
  salary_min: number;
  salary_max: number;
  created: string;
  redirect_url: string;
}

interface AdzunaResponse {
  results: JobResult[];
  count: number;
}

export const fetchJobs = async (page: number = 1, country: string = 'gb'): Promise<JobResult[]> => {
  try {
    const appId = import.meta.env.VITE_ADZUNA_APP_ID;
    const apiKey = import.meta.env.VITE_ADZUNA_API_KEY;
    
    if (!appId || !apiKey) {
      console.error('Missing Adzuna API credentials. Please check your .env file.');
      console.log('Current values:', { appId, apiKey });
      throw new Error('API credentials are not configured');
    }

    console.log(`Fetching jobs for page ${page} from ${country}`);
    
    const url = new URL(`https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`);
    url.searchParams.append('app_id', appId);
    url.searchParams.append('app_key', apiKey);
    url.searchParams.append('results_per_page', '10');
    url.searchParams.append('content-type', 'application/json');
    
    console.log('Fetching from URL:', url.toString());

    const response = await fetch(url.toString());
    const contentType = response.headers.get('content-type');
    console.log('Response content type:', contentType);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data: AdzunaResponse = await response.json();
    console.log('API Response:', {
      totalResults: data.count,
      receivedResults: data.results.length
    });
    
    if (!data.results || !Array.isArray(data.results)) {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid API response format');
    }
    
    return data.results;
  } catch (error) {
    console.error('Error in fetchJobs:', error);
    throw error;
  }
}

export const transformJobData = (job: JobResult) => {
  try {
    console.log('Transforming job:', job.id);
    
    const transformed = {
      id: job.id,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      salary: job.salary_min && job.salary_max 
        ? `$${Math.floor(job.salary_min/1000)}k - $${Math.floor(job.salary_max/1000)}k`
        : 'Salary not specified',
      description: job.description,
      applyUrl: job.redirect_url,
      postedDate: new Date(job.created).toLocaleDateString()
    };
    
    console.log('Successfully transformed job:', transformed);
    return transformed;
  } catch (error) {
    console.error('Error transforming job:', error);
    // Provide a fallback object if transformation fails
    return {
      id: job.id || 'unknown',
      title: job.title || 'Unknown Position',
      company: 'Unknown Company',
      location: 'Location not specified',
      salary: 'Salary not specified',
      description: job.description || 'No description available',
      applyUrl: job.redirect_url || '#',
      postedDate: 'Date not specified'
    };
  }
}; 