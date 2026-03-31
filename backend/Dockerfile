# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build
WORKDIR /source

# Install native dependencies for build (if needed)
RUN apt-get update && apt-get install -y libtesseract-dev tesseract-ocr-spa

# Copy csproj and restore
COPY *.csproj ./
RUN dotnet restore

# Copy rest of the files and publish
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview
WORKDIR /app

# Install native Tesseract dependencies for runtime
RUN apt-get update && apt-get install -y \
    libtesseract-dev \
    tesseract-ocr \
    tesseract-ocr-spa \
    && rm -rf /var/lib/apt/lists/*

# Copy published files from build stage
COPY --from=build /app/publish .

# Explicitly ensure tessdata is in the right place
# The code expects Path.Combine(env.ContentRootPath, "tessdata")
COPY tessdata ./tessdata

# Render uses the PORT environment variable
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "backend.dll"]
