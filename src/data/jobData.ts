export interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  postedDate: string;
  isExclusive?: boolean;
  circle?: {
    name: string;
    memberCount: number;
    connectionDegree: number; // 1st, 2nd, 3rd degree connection
  };
  unlockPrice?: number; // Price in star tokens
  postedBy: {
    name: string; // Real name
    username: string; // Trabaho username
    title: string;
    avatar: string;
    industry: string;
    mutualConnections?: number;
    company?: string;
  };
  networkScore?: number; // 0-100 score based on connection strength
}

export const mockJobs: JobPost[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120k - $180k',
    description: 'We are looking for a Senior Software Engineer to join our team. You will be responsible for developing high-performance applications and leading technical initiatives.',
    postedDate: '2024-03-15',
    postedBy: {
      name: 'Sarah Chen',
      username: '@sarahcodes',
      title: 'Engineering Manager',
      company: 'TechCorp',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=0D8ABC&color=fff',
      industry: 'Technology',
      mutualConnections: 12
    },
    networkScore: 85
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'DesignHub',
    location: 'New York, NY',
    salary: '$90k - $140k',
    description: 'Join our design team to create beautiful and intuitive user experiences. We are seeking a talented Product Designer with a passion for user-centered design.',
    postedDate: '2024-03-14',
    postedBy: {
      name: 'Mike Johnson',
      username: '@mikedesigns',
      title: 'Design Director',
      company: 'DesignHub',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=0D8ABC&color=fff',
      industry: 'Design',
      mutualConnections: 5
    },
    networkScore: 65
  },
  {
    id: '3',
    title: 'AI Research Scientist',
    company: 'SecretTech',
    location: 'Remote',
    salary: '$180k - $250k',
    description: 'Join our stealth AI research team working on breakthrough machine learning technologies. This is an exclusive opportunity for experienced AI researchers.',
    postedDate: '2024-03-13',
    isExclusive: true,
    circle: {
      name: 'AI Innovators Circle',
      memberCount: 150,
      connectionDegree: 3
    },
    unlockPrice: 3,
    postedBy: {
      name: 'David Kumar',
      username: '@davidai',
      title: 'Research Director',
      company: 'SecretTech',
      avatar: 'https://ui-avatars.com/api/?name=David+Kumar&background=0D8ABC&color=fff',
      industry: 'Artificial Intelligence',
      mutualConnections: 3
    },
    networkScore: 45
  },
  {
    id: '4',
    title: 'Stealth Startup CTO',
    company: 'Undisclosed Unicorn',
    location: 'Silicon Valley',
    salary: '$200k - $300k + Equity',
    description: 'Unique opportunity to join a well-funded stealth startup as CTO. We are revolutionizing the future of work with breakthrough technology.',
    postedDate: '2024-03-12',
    isExclusive: true,
    circle: {
      name: 'Founders Circle',
      memberCount: 100,
      connectionDegree: 1
    },
    unlockPrice: 5,
    postedBy: {
      name: 'Alex Rivera',
      username: '@alexfounder',
      title: 'Founder',
      company: 'Undisclosed',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=0D8ABC&color=fff',
      industry: 'Technology',
      mutualConnections: 8
    },
    networkScore: 90
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudSys',
    location: 'Seattle, WA',
    salary: '$110k - $170k',
    description: 'Join our DevOps team to build and maintain our cloud infrastructure. Experience with AWS, Kubernetes, and CI/CD pipelines is required.',
    postedDate: '2024-03-11',
    postedBy: {
      name: 'Emma Chen',
      username: '@emmacloud',
      title: 'DevOps Lead',
      company: 'CloudSys',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Chen&background=0D8ABC&color=fff',
      industry: 'Cloud Computing',
      mutualConnections: 4
    },
    networkScore: 70
  },
  {
    id: '6',
    title: 'Frontend Developer',
    company: 'WebFlow',
    location: 'Remote',
    salary: '$100k - $150k',
    description: 'Looking for a talented Frontend Developer to join our team. Experience with React, TypeScript, and modern web technologies required.',
    postedDate: '2024-03-10',
    postedBy: {
      name: 'Lisa Wang',
      username: '@lisacodes',
      title: 'Frontend Lead',
      company: 'WebFlow',
      avatar: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=0D8ABC&color=fff',
      industry: 'Web Development',
      mutualConnections: 6
    },
    networkScore: 75
  },
  {
    id: '7',
    title: 'Late-Stage Startup CTO',
    company: 'Hidden Unicorn',
    location: 'San Francisco, CA',
    salary: '$250k - $350k + Significant Equity',
    description: 'Join a late-stage startup as CTO. We are a rapidly growing company with over 100 employees and $50M+ in funding. Looking for a technical leader to drive innovation.',
    postedDate: '2024-03-09',
    isExclusive: true,
    circle: {
      name: 'Tech Leaders Circle',
      memberCount: 200,
      connectionDegree: 2
    },
    unlockPrice: 4,
    postedBy: {
      name: 'James Wilson',
      username: '@jamescto',
      title: 'Founder & CEO',
      company: 'Hidden Unicorn',
      avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=0D8ABC&color=fff',
      industry: 'Technology',
      mutualConnections: 7
    },
    networkScore: 80
  }
]; 