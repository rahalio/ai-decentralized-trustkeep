import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="tk-login">
      <div className="tk-login-panel">
        <div className="tk-brand" style={{ fontSize: '2rem', marginBottom: 8 }}>
          Trustkeep
        </div>
        <h1>Keep the right to process</h1>
        <p>
          Executive digital-trust scoreboard for journey consent hygiene, breach recovery,
          and monetisation gates.
        </p>
        <button
          className="tk-btn tk-btn-primary"
          onClick={() => {
            localStorage.setItem('trustkeep_session', '1');
            navigate('/');
          }}
        >
          Enter Trustkeep
        </button>
      </div>
    </div>
  );
}
