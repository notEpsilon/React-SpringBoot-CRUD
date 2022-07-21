import Container from "./Container";

const Navigation: React.FC = () => {
  return (
    <header className="h-16 bg-gray-800">
      <Container className="flex items-center">
        <span className="text-lg font-medium tracking-wider text-white">
          User Managment System
        </span>
      </Container>
    </header>
  );
};

export default Navigation;
