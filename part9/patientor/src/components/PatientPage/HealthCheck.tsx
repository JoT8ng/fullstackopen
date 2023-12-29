import { HealthCheckEntry } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    let color: 'green' | 'yellow' | 'orange' | 'red';

    switch (entry.healthCheckRating) {
        case 0:
          color = 'green';
          break;
        case 1:
          color = 'yellow';
          break;
        case 2:
          color = 'orange';
          break;
        case 3:
          color = 'red';
          break;
        default:
          color = 'green';
          break;
      }
    
    return (
        <div>
            <p>Health Check Rating: {entry.healthCheckRating}</p>
            <FavoriteIcon className="heart" style={{color}} />
        </div>
    );
};

export default HealthCheck;