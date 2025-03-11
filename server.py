from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

# Change to the src directory
os.chdir(os.path.join(os.path.dirname(__file__), 'src'))

# Create server
PORT = 8000
server_address = ('', PORT)
httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)

print(f'Server running at http://localhost:{PORT}')
print('Press Ctrl+C to stop the server')
httpd.serve_forever() 