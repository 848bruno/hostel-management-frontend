import { FadeLoader } from 'react-spinners';

function Loaders() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-100">
      <FadeLoader color="gray" />
    </div>
  );
}

export default Loaders;
