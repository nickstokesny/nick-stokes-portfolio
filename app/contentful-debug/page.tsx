'use client'

import React from 'react';

export default function ContentfulDebugPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Contentful Debug Page
      </h1>
      
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
          Environment Variables:
        </h2>
        <pre
          style={{
            backgroundColor: "#f0f0f0",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {JSON.stringify({
            spaceId: "cszeducxrmkk",
            accessToken: "Sip_UvcPWo5tIrIVdRFBHHjy9h2nmUExxMphbz7ukkc",
          }, null, 2)}
        </pre>
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
          Connection Test:
        </h2>
        <p>To test the Contentful connection, visit the <a href="/work" style={{ color: "blue", textDecoration: "underline" }}>work page</a>.</p>
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
          Manual Testing Steps:
        </h2>
        <ol style={{ paddingLeft: "20px" }}>
          <li style={{ marginBottom: "8px" }}>Visit the <a href="/work" style={{ color: "blue", textDecoration: "underline" }}>work page</a> to see if categories and photos load</li>
          <li style={{ marginBottom: "8px" }}>Click on a photo to test the detail page</li>
          <li style={{ marginBottom: "8px" }}>Check if images are displaying correctly</li>
          <li style={{ marginBottom: "8px" }}>Verify that category links work</li>
        </ol>
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
          Contentful Configuration:
        </h2>
        <ul style={{ paddingLeft: "20px" }}>
          <li style={{ marginBottom: "8px" }}>Space ID: cszeducxrmkk</li>
          <li style={{ marginBottom: "8px" }}>Content Types: Category, Photo</li>
          <li style={{ marginBottom: "8px" }}>API: Content Delivery API</li>
        </ul>
      </div>
    </div>
  );
}