#!/usr/bin/env python3
import http.server
import socketserver
import json
import os
from datetime import datetime

PORT = 5000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()
    
    def do_POST(self):
        if self.path == '/api/contact':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                
                name = data.get('name', '').strip()
                email = data.get('email', '').strip()
                subject = data.get('subject', '').strip()
                message = data.get('message', '').strip()
                
                if not all([name, email, subject, message]):
                    self.send_response(400)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    response = {'success': False, 'message': 'Tous les champs sont requis'}
                    self.wfile.write(json.dumps(response).encode())
                    return
                
                contact_entry = {
                    'timestamp': datetime.now().isoformat(),
                    'name': name,
                    'email': email,
                    'subject': subject,
                    'message': message
                }
                
                os.makedirs('messages', exist_ok=True)
                messages_file = 'messages/contacts.json'
                
                messages = []
                if os.path.exists(messages_file):
                    try:
                        with open(messages_file, 'r', encoding='utf-8') as f:
                            messages = json.load(f)
                    except:
                        messages = []
                
                messages.append(contact_entry)
                
                with open(messages_file, 'w', encoding='utf-8') as f:
                    json.dump(messages, f, ensure_ascii=False, indent=2)
                
                print(f"✅ Nouveau message reçu de {name} ({email})")
                print(f"   Sujet: {subject}")
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'success': True, 
                    'message': f'Merci {name} ! Votre message a été envoyé avec succès. Je vous répondrai bientôt.'
                }
                self.wfile.write(json.dumps(response).encode())
                
            except Exception as e:
                print(f"❌ Erreur lors du traitement du message: {e}")
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {'success': False, 'message': 'Erreur serveur. Veuillez réessayer.'}
                self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()

os.chdir(os.path.dirname(os.path.abspath(__file__)))

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

with ReusableTCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
    print(f"Portfolio server running on http://0.0.0.0:{PORT}")
    print("Press Ctrl+C to stop the server")
    httpd.serve_forever()
