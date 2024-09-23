import { VideoStream } from "@/components/video-stream";

interface Camera {
  id: number;
  name: string;
}

interface MultiCameraViewProps {
  cameras?: Camera[];
}

const defaultCameras: Camera[] = [
  { id: 1, name: "Default Camera 1" },
  { id: 2, name: "Default Camera 2" },
  { id: 3, name: "Default Camera 3" },
  { id: 4, name: "Default Camera 4" },
];

export function MultiCameraView({
  cameras = defaultCameras,
}: MultiCameraViewProps) {
  // Function to determine the grid columns based on the number of cameras
  const getGridCols = (count: number) => {
    if (count <= 1) return "grid-cols-1";
    if (count <= 2) return "grid-cols-1 sm:grid-cols-2";
    if (count <= 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  };

  const displayCameras = cameras.length > 0 ? cameras : defaultCameras;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Multi-Camera View</h1>
      <div className={`grid ${getGridCols(displayCameras.length)} gap-4`}>
        {displayCameras.map((camera) => (
          <div
            key={camera.id}
            className="relative size-full bg-gray-200 rounded-lg overflow-hidden"
          >
            <VideoStream device={camera.id} />

            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p className="text-xs font-semibold">{camera.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
