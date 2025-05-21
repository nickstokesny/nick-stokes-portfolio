// app/contentful-debug/page.tsx
import { contentfulClient } from "@/lib/contentful/contentful";

export default async function ContentfulDebugPage() {
  let entriesByType: Record<string, any[]> = {};
  let error = null;
  
  try {
    // Since getContentTypes is not available, let's fetch entries for known content types
    const contentTypes = ['photo', 'category', 'siteSettings']; // Add any other content types you have
    
    // Fetch entries for each content type
    for (const contentType of contentTypes) {
      try {
        const entries = await contentfulClient.getEntries({
          content_type: contentType,
        });
        
        entriesByType[contentType] = entries.items;
      } catch (err) {
        console.error(`Error fetching ${contentType}:`, err);
        entriesByType[contentType] = [];
      }
    }
  } catch (err: any) {
    error = err.message;
  }
  
  return (
    <div style={{ padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Contentful Content Debug</h1>
      
      {error && (
        <div style={{ 
          padding: "15px", 
          backgroundColor: "#fee2e2", 
          color: "#b91c1c", 
          borderRadius: "5px",
          marginBottom: "20px"
        }}>
          <p>Error: {error}</p>
        </div>
      )}
      
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Environment Variables:</h2>
        <pre style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
          {JSON.stringify({
            CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID ? "✓ Set" : "✗ Not set",
            CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN ? "✓ Set (hidden)" : "✗ Not set",
          }, null, 2)}
        </pre>
      </div>
      
      {Object.entries(entriesByType).map(([contentType, entries]) => (
        <div key={contentType} style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
            Content Type: {contentType}
          </h2>
          
          {entries.length === 0 ? (
            <p>No entries found</p>
          ) : (
            entries.map((entry) => (
              <div 
                key={entry.sys.id} 
                style={{ 
                  marginBottom: "20px", 
                  padding: "15px", 
                  border: "1px solid #ddd", 
                  borderRadius: "5px" 
                }}
              >
                <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>
                  Entry ID: {entry.sys.id}
                </h3>
                
                <pre style={{ 
                  backgroundColor: "#f5f5f5", 
                  padding: "10px", 
                  borderRadius: "5px",
                  overflow: "auto",
                  maxHeight: "300px"
                }}>
                  {JSON.stringify(entry.fields, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}