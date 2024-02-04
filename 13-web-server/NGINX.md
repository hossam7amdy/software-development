# NGINX

NGINX is a free, open-source, high-performance HTTP server and reverse proxy, as well as an IMAP/POP3 proxy server. NGINX is known for its high performance, stability, rich feature set, simple configuration, and low resource consumption.

## Use Cases

NGINX can be used for a variety of use cases, including:

- Serving static content, such as HTML, CSS, JavaScript, images, and other files
- Load balancing incoming traffic across multiple backend servers
- SSL/TLS termination to offload encryption and decryption from backend servers
- Reverse proxying to forward requests to backend servers and handle responses
- Caching to improve performance and reduce the load on backend servers
- Web application firewall to protect against common web application attacks
- Media streaming to deliver audio and video content to clients
- API gateway to manage and secure access to backend APIs
- Microservices architecture to route requests to different services based on URL paths

## Terminology

### NGINX Configuration

NGINX configuration files are typically located in the `/etc/nginx` directory and have a `.conf` file extension. The main configuration file is `nginx.conf`, which includes other configuration files from the `conf.d` directory.

### Directives

NGINX configuration files consist of directives, which are used to define how NGINX should process and respond to client requests. _Directives_ can be used to configure various aspects of NGINX, such as server settings, location contexts, and SSL/TLS settings.

### Contexts

NGINX configuration files are organized into contexts, which define the scope and applicability of directives. The main contexts in NGINX configuration files are `http`, `server`, and `location`, which correspond to the HTTP server, virtual server, and URL location, respectively.

## Serving Static Content

NGINX can be used to serve static content, such as HTML, CSS, JavaScript, images, and other files, from the file system. This can be done by configuring a `server` block with a `location` block that specifies the root directory and index file for the static content.

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        root /var/www/html;
        index index.html;
    }
}
```

## Mime Types

MIME types are used to identify the type of content being served by a web server, such as HTML, CSS, JavaScript, images, and other files. NGINX uses the `types` directive to define MIME types and associate file extensions with content types.

```nginx
types {
    text/html html htm;
    text/css css;
    application/javascript js;
    image/jpeg jpg jpeg;
    image/png png;
}
```

## Location Contexts

The `location` context in NGINX configuration files is used to define how NGINX should process and respond to client requests for specific URL locations. The `location` context can be used to configure various aspects of request handling, such as proxying, rewriting, and redirecting.

```nginx
http {
    include mime.types;

    server {
        listen 80;
        root /Users/username/Sites;

        location /fruits {
            root /Users/username/Sites;
        }

        location /carbs {
            alias /Users/username/Sites/fruits;
        }

        location /veggies {
            try_files $uri $uri/ /index.html;
        }

        location ~* /count/[0-9]+ {
            root /Users/username/Sites;
            try_files /index.html =404;
        }
    }
}
```

## Rewrites and Redirect

NGINX can be used to rewrite and redirect URLs to different locations, such as when migrating content to a new URL structure or when implementing SEO-friendly URLs. This can be done using the `rewrite` and `return` directives in the `location` context.

```nginx
server {
    listen 80;
    server_name example.com;

    location /old-url {
        rewrite ^/old-url/(.*)$ /new-url/$1 permanent;
    }

    location /redirect {
        return 301
    }
}
```

## NGINX as a Load Balancer

NGINX can be used as a load balancer to distribute incoming traffic across multiple backend servers. This can help improve performance, scalability, and reliability by ensuring that no single server is overwhelmed with requests.

<img src="image-1.png" alt="load balancer" height="350px" />

```nginx
upstream backend {
    server 127.0.0.1:1111;
    server 127.0.0.1:2222;
    server 127.0.0.1:3333;
    server 127.0.0.1:4444;
}

server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://backend/;
    }
}
```

## NGINX as a Reverse Proxy

A reverse proxy server is a type of proxy server that typically sits behind the firewall in a private network and directs client requests to the appropriate backend server. A reverse proxy provides an additional level of abstraction and control to ensure the smooth flow of network traffic between clients and servers.

<img src="image.png" alt="reverse proxy" height="350px" />

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## NGINX as a Web Server

NGINX can be used as a standalone web server, serving static content from the file system. It can also be used to serve as a reverse proxy for a web server, such as Apache, to improve performance and security.

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        root /var/www/html;
        index index.html;
    }
}
```

## NGINX as an SSL Termination Proxy

NGINX can be used as an SSL termination proxy to offload SSL/TLS encryption and decryption from backend servers. This can help improve performance and reduce the load on backend servers by handling the computationally intensive task of SSL/TLS encryption and decryption.

<img src="image-2.png" alt="reverse proxy" height="350px" />

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/nginx/ssl/example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/example.com.key;

    location / {
        proxy_pass http://backend;
    }
}
```

## Conclusion

NGINX is a versatile and powerful web server, reverse proxy, and load balancer that can be used to improve the performance, scalability, and security of web applications. By understanding the various use cases, terminology, and configuration options, you can leverage NGINX to build robust and high-performance web infrastructure.

## References

- [NGINX Tutorial for Beginners](https://youtu.be/9t9Mp0BGnyI?si=fcF_mTGKJf1Xc-Gk)
- [NGINX Beginner's Guide](https://www.nginx.com/resources/wiki/start/)
