#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Simple Python web server for a portfolio.
Serves static files (HTML, CSS, JS) and handles a basic API
for the contact form, saving messages to a JSON file.
"""

import http.server
import socketserver
import json
import os
from datetime import datetime

PORT = 5000
# Directory where messages will be saved
MESSAGES_DIR = 'messages'
MESSAGES_FILE = os.path.join(MESSAGES_DIR, 'contacts.json')

class PortfolioHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """
    Custom handler to manage GET (files)
    and POST (contact form) requests.
    """

    def end_headers(self):
        """
        Adds headers to prevent browser caching.
        Useful for development.
        """
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_GET(self):
        """
        Serves static files.
        Redirects '/' to '/index.html'.
        """
        if self.path == '/':
            self.path = '/index.html'
        
        # Try to serve the requested file
        try:
            return super().do_GET()
        except BrokenPipeError:
            # Handle broken pipe errors silently (e.g., client closes connection)
            print("Broken pipe error, client disconnected.")
        except Exception as e:
            print(f"GET Error: {e}")
            self.send_error(500, "Internal Server Error")

    
    def do_POST(self):
        """
        Handles the contact form submission via the '/api/contact' API.
        """
        if self.path == '/api/contact':
            try:
                # 1. Read the request body
                content_length = int(self.headers['Content-Length'])
                post_data_bytes = self.rfile.read(content_length)
                data = json.loads(post_data_bytes.decode('utf-8'))
                
                # 2. Validate data (basic cleaning)
                name = data.get('name', '').strip()
                email = data.get('email', '').strip()
                subject = data.get('subject', '').strip()
                message = data.get('message', '').strip()
                
                if not all([name, email, subject, message]):
                    # If fields are missing
                    self._send_json_response(400, {
                        'success': False, 
                        'message': 'All fields are required' # Translated
                    })
                    return
                
                # 3. Prepare the entry
                contact_entry = {
                    'timestamp': datetime.now().isoformat(),
                    'name': name,
                    'email': email,
                    'subject': subject,
                    'message': message,
                    'read': False # Added an "unread" status
                }
                
                # 4. Save the message to the JSON file
                self._save_message(contact_entry)
                
                # Translated log
                print(f"✅ New message received from {name} ({email})")
                print(f"   Subject: {subject}")
                
                # 5. Send a success response
                self._send_json_response(200, {
                    'success': True, 
                    'message': f'Thank you {name}! Your message has been sent successfully.' # Translated
                })
                
            except json.JSONDecodeError:
                print("❌ Error: Non-JSON POST data.")
                self._send_json_response(400, {
                    'success': False, 
                    'message': 'Invalid request format.' # Translated
                })
            except Exception as e:
                print(f"❌ Error processing message: {e}")
                self._send_json_response(500, {
                    'success': False, 
                    'message': 'Internal server error. Please try again.' # Translated
                })
        else:
            # If the POST path is not '/api/contact'
            self._send_json_response(404, {
                'success': False, 
                'message': 'Endpoint not found' # Translated
            })

    def _send_json_response(self, status_code, content):
        """
        Utility function to send a JSON response.
        """
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(content).encode('utf-8'))

    def _save_message(self, entry):
        """
        Loads existing messages, appends the new one, and saves.
        """
        # Ensure the 'messages' directory exists
        os.makedirs(MESSAGES_DIR, exist_ok=True)
        
        messages = []
        if os.path.exists(MESSAGES_FILE):
            try:
                with open(MESSAGES_FILE, 'r', encoding='utf-8') as f:
                    messages = json.load(f)
                    if not isinstance(messages, list):
                        messages = []
            except json.JSONDecodeError:
                messages = []
        
        messages.append(entry)
        
        try:
            with open(MESSAGES_FILE, 'w', encoding='utf-8') as f:
                json.dump(messages, f, ensure_ascii=False, indent=4)
        except IOError as e:
            print(f"❌ Error writing messages file: {e}")
            raise # Re-raise the error to be handled by do_POST

# Allows reusing the address quickly after stopping
class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

if __name__ == "__main__":
    # Change to the script's directory so file paths are correct
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with ReusableTCPServer(("", PORT), PortfolioHTTPRequestHandler) as httpd:
        # Translated logs
        print(f"Portfolio server started on http://0.0.0.0:{PORT}")
        print(f"Use http://localhost:{PORT} to access the site.")
        print("Press Ctrl+C to stop the server.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopping server.")
            httpd.server_close()

