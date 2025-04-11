import subprocess
import sys
import os
import signal
import time
import webbrowser

def run_servers():
    # Get the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Start backend server
    backend_cmd = ["python", "backend/app.py"]
    backend_process = subprocess.Popen(
        backend_cmd,
        cwd=current_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    # Start frontend server - using the root directory since package.json is there
    frontend_cmd = ["npm", "run", "dev"]
    frontend_process = subprocess.Popen(
        frontend_cmd,
        cwd=current_dir,  # Use the root directory where package.json is located
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        shell=True  # Use shell=True for Windows compatibility
    )
    
    print("Starting both servers...")
    print("Backend server running at http://localhost:5000")
    print("Frontend server running at http://localhost:8082")
    print("Press Ctrl+C to stop both servers")
    
    # Wait a few seconds for the frontend server to start
    time.sleep(5)  # Increased wait time to ensure server is ready
    
    # Open the frontend URL in the default browser
    frontend_url = "http://localhost:8082"
    print(f"Opening {frontend_url} in your default browser...")
    webbrowser.open(frontend_url)
    
    try:
        # Print output from both processes
        while True:
            # Print backend output
            backend_output = backend_process.stdout.readline()
            if backend_output:
                print(f"[Backend] {backend_output.strip()}")
            
            # Print frontend output
            frontend_output = frontend_process.stdout.readline()
            if frontend_output:
                print(f"[Frontend] {frontend_output.strip()}")
            
            # Check if either process has terminated
            if backend_process.poll() is not None or frontend_process.poll() is not None:
                break
                
            time.sleep(0.1)
            
    except KeyboardInterrupt:
        print("\nStopping servers...")
        backend_process.terminate()
        frontend_process.terminate()
        backend_process.wait()
        frontend_process.wait()
        print("Servers stopped")

if __name__ == "__main__":
    run_servers() 