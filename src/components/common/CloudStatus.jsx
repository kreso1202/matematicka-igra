import { Wifi, WifiOff } from '../Icons';

function CloudStatus({ isOnline, isLoading }) {
    return (
        <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 rounded-lg text-sm">
            <div className="flex items-center gap-2">
                {isOnline ? (
                    <>
                        <Wifi className="text-green-500" size={16} />
                        <span className="text-green-700">Online natjecanje</span>
                    </>
                ) : (
                    <>
                        <WifiOff className="text-orange-500" size={16} />
                        <span className="text-orange-700">Offline način</span>
                    </>
                )}
            </div>
            {isLoading && <div className="text-blue-500">🔄</div>}
        </div>
    );
}

export default CloudStatus;
