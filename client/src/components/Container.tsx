interface Props {
  className?: string;
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={`mx-auto h-full max-w-[min(90%,75rem)] ${className}`}>
      {children}
    </div>
  );
};

export default Container;
