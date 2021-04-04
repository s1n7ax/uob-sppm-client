import BButton from 'react-bootstrap/Button';

function Button({ children, type, color }) {
  type = type || 'submit';
  color = color || '#e03467';

  return (
    <BButton type={type} variant="pink">
      {children}
    </BButton>
  );
}

export default Button;
