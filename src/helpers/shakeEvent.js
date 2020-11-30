import { Accelerometer } from 'expo-sensors';

const THRESHOLD = 450;

export class ShakeEvent {
    static addListener = handler => {
        let last_x, 
            last_y,
            last_z;
        let lastUpdate = 0;

        Accelerometer.addListener(accelerometerData => {
            const {x, y, z} = accelerometerData;
            const currTime = Date.now();

            if ((currTime - lastUpdate) < 100) {
                return;
            }

            const diffTime = (currTime - lastUpdate);
            lastUpdate = currTime;

            const speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

            if (speed > THRESHOLD) {
                console.log('shake detected with speed: ' + speed);
                handler();
            }
            
            last_x = x;
            last_y = y;
            last_z = z;
        });
    };

    static removeListener = () => {
        Accelerometer.addListener(() => null);
        Accelerometer.removeAllListeners();
    };
}