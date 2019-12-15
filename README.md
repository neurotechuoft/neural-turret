# neural-turret
Demo of a P300-controlled turret.

## Setting Up

1. Clone this repo locally. 
2. run "npm start" and wait. 

## Developer Notes

- The front end application will not be interacting with Muse directly, but will be interacting with the Neurostack/P300 client.
- The front end is connected to the Muse server (localhost:8002)
- The Muse server receives Muse EEG data through the LSL. You can stream Muse data to this layer using BlueMuse 
- The Muse server streams data to the P300 client (localhost:8001)


**If you are having trouble with any of the steps, please submit an issue or contact us through Slack :)**