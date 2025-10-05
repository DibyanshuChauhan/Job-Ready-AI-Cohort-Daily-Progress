# Module 01: Computer Network Essentials for Web Development

Sheryians Coding School | Cohort 2.0 Daily Learning Log

This repository documents my comprehensive study of Computer Network Fundamentals, serving as the essential groundwork before diving into Full Stack Web Development within the Cohort 2.0 program. These notes cover the foundational principles that govern the Internet, data transfer, application architecture, security protocols, and more, drawing from detailed lectures and handwritten notes.

## 🌟 Course Identity

This section is dedicated to visually representing the module or course.

---

## 💻 Section 1: How the Internet Works & Addressing

This section details the journey of a data request across the internet and the unique identifiers used by devices.

### 1.1 How the Internet Works Step by Step

The internet operates as a global network of interconnected devices. Here's a detailed step-by-step explanation of how it works, based on accessing a website like www.google.com:

1. **Device Connection to ISP**: Your device (e.g., phone or laptop) connects to the internet through your Internet Service Provider (ISP).

2. **Domain Name Resolution (DNS Lookup)**: Your device doesn't understand domain names; it uses numbers. The Domain Name System (DNS) converts the website name (www.google.com) into its corresponding IP address.

3. **Request Preparation and Packetization**: Once the IP address is known, the request is prepared. Instead of sending data as one large piece, it's broken into small packets. Each packet includes:
   - A portion of the data.
   - The destination IP address.
   - A sequence number for reassembly.

4. **Packet Routing**: Packets travel through the network via routers, which act like traffic managers. Each router examines the packet and selects the optimal path. Packets from the same request may take different routes but converge at the destination.

5. **Server Reception and Processing**: The server (e.g., Google's server) receives the packets, reassembles them, understands the request, and processes it.

6. **Response Packetization and Return Journey**: The server sends back a response in packets, which are routed back to your device via routers.

7. **Reassembly and Display**: Your browser reassembles the packets using sequence numbers. If any packets are missing, it requests them again. Once complete, the webpage, image, or video is displayed. This process occurs in milliseconds.

### 1.2 What is an IP Address?

An IP address (Internet Protocol Address) is a unique numerical label assigned to each device on a network. It serves two purposes:
- **Identity**: Identifies the device.
- **Location**: Indicates its position on the network.

Just like a postal address ensures letters reach your home, an IP address ensures data reaches your device. Example: 192.168.1.1.

#### IP Address and Internet Connection
- An IP address is required for network communication.
- When connected to the internet, your device gets a public or private IP as its identity for data exchange.
- Without any network connection, no active IP is assigned.
- On a local network (LAN/WiFi) without internet, a private IP may be assigned by the router, but it's not usable globally.

### 1.3 Types of IP Addresses

There are two main versions:

1. **IPv4**: 32-bit addresses, written as four decimal numbers separated by dots (e.g., 192.168.0.1). Limited to about 4.3 billion addresses.
2. **IPv6**: 128-bit addresses, written in hexadecimal separated by colons (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334). Provides vastly more addresses.

### 1.4 Key Differences Between Public and Private IP Addresses

Public and private IP addresses differ in scope and usage:

| Feature      | Public IP                              | Private IP                             |
|--------------|----------------------------------------|----------------------------------------|
| Visibility  | Visible on the internet (unique worldwide) | Only visible inside a local network    |
| Assigned By | Internet Service Provider (ISP)        | Router or network administrator        |
| Uniqueness  | Must be unique globally                | Can be reused in different networks    |
| Example     | 103.45.67.89                           | 192.168.0.1, 10.0.0.2                 |

Public IPs are used for global communication, while private IPs are for internal networks (e.g., home WiFi).

### 1.5 Key Differences Between IPv4 & IPv6


| Feature              | IPv4                                   | IPv6                                       |
|----------------------|----------------------------------------|--------------------------------------------|
| Address Size        | 32-bit                                 | 128-bit                                    |
| Address Format      | Decimal with dots (e.g., 192.168.1.1)  | Hexadecimal with colons (e.g., 2001:0db8:85a3:08d3:1319:8a2e:0370:7344) |
| Address Space       | ~4.3 billion unique addresses          | ~340 undecillion (almost unlimited)        |
| Security            | IPsec optional                         | IPsec mandatory (built-in security)        |
| NAT                 | Required due to address shortage       | Not needed (ample addresses)               |
| Speed & Efficiency  | Slower packet processing               | Faster routing and processing              |
| Deployment          | Old, widely used                       | New, gradually replacing IPv4              |

IPv6 addresses the IPv4 address exhaustion and improves efficiency.

### 1.6 What is a MAC Address?


MAC (Media Access Control) Address is a unique hardware identifier assigned to a device's network interface card (NIC), such as a WiFi or Ethernet card. It's permanent, set by the manufacturer, and typically 48 bits long (e.g., 00:1A:2B:3C:4D:5E).

### 1.7 IP Address vs MAC Address

| Feature      | IP Address                             | MAC Address                            |
|--------------|----------------------------------------|----------------------------------------|
| Purpose     | Logical address for network routing    | Physical address for hardware identification |
| Layer       | Network layer (Layer 3)                | Data link layer (Layer 2)              |
| Changeability | Can change (dynamic)                   | Permanent                              |
| Format      | IPv4/IPv6 (variable length)            | 48-bit hexadecimal                     |
| Assigned By | ISP or router                          | Manufacturer                           |

IP addresses handle routing across networks, while MAC addresses manage local communication.

---

## 🌐 Section 2: Client-Server Architecture & Web Evolution

### 2.1 Client-Server Architecture Step by Step


Client-Server Architecture is a model where tasks are divided between clients (requesters) and servers (providers).

#### What is Client and Server?
- **Client**: A device or software requesting services (e.g., web browser like Chrome, phone app like WhatsApp). Clients send requests and wait for responses.
- **Server**: A device or software providing services (e.g., web server like Apache/Nginx, mail server). Servers listen for requests and respond.

#### How Does It Work? (Step by Step)
1. **Client Sends Request**: e.g., Typing www.google.com in browser.
2. **Server Receives Request**: Google's server gets the query.
3. **Server Processes Request**: Finds the homepage data.
4. **Server Sends Response**: Returns the webpage in packets.
5. **Client Displays Response**: Browser shows the Google homepage.

#### Examples in Daily Life
- Web Browsing: Browser (client) → Website server.
- Email: Gmail app (client) → Gmail server.
- Banking: App (client) → Bank server.
- Streaming: Netflix app (client) → Netflix server.

#### Advantages
- Centralized Data Management: Easy to update data on servers.
- Multiple Client Support: Handles many users simultaneously.
- Better Security: Data monitored at the server.
- Scalability: Servers can be upgraded.

#### Disadvantages
- Single Point of Failure: Server crash affects all clients.
- Server Overload: Too many requests slow it down.
- Costly Setup: High-performance servers are expensive.

#### Conclusion
Client-Server is the backbone of modern applications, providing structured communication despite some drawbacks.

### 2.2 The Evolution of the Web


The web has evolved in stages, becoming more interactive and intelligent:

| Version | Era                  | Characteristics                                | Examples                       |
|---------|----------------------|------------------------------------------------|--------------------------------|
| Web 1.0 | 1990s - early 2000s | Static (Read-Only): Mostly text/images, no interaction. | Early Yahoo pages, personal blogs. |
| Web 2.0 | 2000s - Today       | Social (Read-Write): User-generated content, social media. | Facebook, YouTube, Wikipedia. |
| Web 3.0 | Happening Now       | Decentralized & Smart (Read-Write-Own): Blockchain, AI, user control. | dApps on Ethereum, AI assistants. |
| Web 4.0 | Future              | Intelligent & Connected: AI, VR/AR, IoT for seamless digital-physical integration. | Smart fridges ordering groceries, VR classrooms, anticipatory AI assistants. |

---

## 🔒 Section 3: Communication Protocols (HTTP, TCP, UDP)

### 3.1 HTTP (Hyper Text Transfer Protocol)

HTTP is the foundation protocol for web communication, defining client-server data exchange. It's stateless and text-based.

#### HTTP Request-Response-Render Process
1. **Request**: Browser sends HTTP request for resources (e.g., GET /index.html HTTP/1.1 Host: www.google.com).
2. **Response**: Server sends status (e.g., 200 OK), headers, and body (HTML).
3. **Rendering**: Browser parses HTML, loads CSS/JS/images, builds DOM, and displays.

### 3.2 Versions of HTTP

HTTP has evolved for better performance:

| Version | Key Features |
|---------|--------------|
| HTTP/1.0 | Basic, new TCP connection per request. |
| HTTP/1.1 | Persistent connections, pipelining. |
| HTTP/2 | Multiplexing, header compression, server push. |
| HTTP/3 | Uses QUIC (UDP-based) for faster setup, reduced latency. |


### 3.3 HTTP Status Codes

| Range | Meaning         | Example                | Description                            |
|-------|-----------------|------------------------|----------------------------------------|
| 1xx   | Informational   | 100 Continue          | Continue sending request.              |
| 2xx   | Success         | 200 OK                | Request successful.                    |
| 3xx   | Redirection     | 301 Moved Permanently | Resource moved.                        |
| 4xx   | Client Error    | 404 Not Found         | Resource not found.                    |
| 5xx   | Server Error    | 500 Internal Server Error | Server issue.                      |

### 3.4 TCP vs. UDP


| Feature      | TCP                                    | UDP                                    |
|--------------|----------------------------------------|----------------------------------------|
| Connection  | Connection-oriented (3-way handshake) | Connectionless                         |
| Reliability | Reliable (delivery, order, error-check)| Unreliable (possible loss/out-of-order)|
| Speed       | Slower due to overhead                 | Faster with minimal checks             |
| Use Cases   | Web (HTTP/S), email, file transfer     | Gaming, VoIP, streaming                |

---

## 🔒 Section 4: Security and Networking Tools

### 4.1 HTTP vs HTTPS

HTTPS is HTTP over TLS/SSL, adding security:

| Feature      | HTTP                                   | HTTPS                                  |
|--------------|----------------------------------------|----------------------------------------|
| Security    | No encryption (data visible)           | Encrypted (confidentiality, integrity) |
| Authentication | None                                   | Server verified via certificates       |
| Port        | 80                                     | 443                                    |
| Indicator   | No padlock                             | Padlock in browser                     |

HTTPS uses a handshake with public/private keys for secure sessions.

### 4.2 Proxy, Reverse Proxy, and VPN

#### Proxy vs. Reverse Proxy vs. VPN

- **Proxy (Forward Proxy)**: Acts as a middleman for client requests, hiding client IP. Low security, application-level.


- **Reverse Proxy**: Sits in front of servers, handling incoming requests. Provides load balancing, caching, security. Hides server details.


- **VPN**: Encrypts all traffic in a secure tunnel, system-level. High security for privacy, public WiFi.

| Feature       | Proxy                  | Reverse Proxy          | VPN                    |
|---------------|------------------------|------------------------|------------------------|
| Direction    | Client-side            | Server-side            | Full network           |
| Security     | Low (hides IP only)    | Medium (protects servers) | High (full encryption) |
| Scope        | Application            | Server protection      | System-wide            |
| Use Case     | Geo-restrictions       | Load balancing         | Secure remote access   |

---

Check the Commit History for daily updates!

[View Commit History](https://github.com/DibyanshuChauhan/Job-Ready-AI-Cohert-Daily-Progress/commits/main)