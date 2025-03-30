# Use the official Python runtime image
FROM python:3.14.0a6-bookworm  
 
# Create the app directory
RUN mkdir /app
WORKDIR /app
# Set environment variables 
# Prevents Python from writing pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1
#Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1 
 
# Upgrade pip
RUN pip install --upgrade pip 
 
# Copy the Django project  and install dependencies
COPY requirements.txt  /app/

# run this command to install all dependencies 
RUN pip install --no-cache-dir -r requirements.txt
 
# Copy the Django project to the container
COPY . /app/

# Expose the Django port
EXPOSE 8080

# Run Django’s development server
CMD ["python", "france_datamap/manage.py", "runserver", "0.0.0.0:8080"]

