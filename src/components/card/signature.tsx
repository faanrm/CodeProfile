export const FunnySignature: React.FC<{name: string}> = ({ name }) => {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 300 100" 
        className="absolute bottom-4 right-4 opacity-70"
        width="200"
        height="70"
      >
        <path 
          d={`M10 80 
              Q50 20, 100 50 
              Q150 80, 200 40 
              Q250 10, 290 80`} 
          fill="none" 
          stroke="#2C3E50" 
          strokeWidth="3" 
          strokeLinecap="round"
        />
        <text 
          x="50" 
          y="70" 
          fontFamily="Comic Sans MS, cursive" 
          fontSize="20" 
          fill="#2C3E50"
          style={{
            userSelect: 'none',
            fontStyle: 'italic'
          }}
        >
          {`${name} was here 🤪`}
        </text>
      </svg>
    );
  };