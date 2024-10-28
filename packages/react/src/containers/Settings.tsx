import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return <div className="Settings"></div>;
}