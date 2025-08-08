import { useState, useRef } from "react";

export default function AIDoctorVideoApp() {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");
  const videoRef = useRef(null);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (symptoms.toLowerCase().includes("headache") || symptoms.toLowerCase().includes("throat")) {
      setResponse("You may have a mild viral infection. Rest, hydrate, and monitor symptoms.");
    } else {
      setResponse("Thank you for sharing. A detailed response will be generated shortly.");
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '960px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>AI Doctor – Video Call Assistant</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '12px' }} />
          <button onClick={startVideo} style={{ marginTop: '1rem', width: '100%' }}>Start Video Call</button>
        </div>
        <div style={{ flex: 1 }}>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Describe your health issue in any language..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              style={{ width: '100%', height: '100px' }}
            />
            <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Submit to AI Doctor</button>
          </form>
          {response && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f1f1f1', borderRadius: '8px' }}>
              <strong>AI Response:</strong>
              <p>{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
