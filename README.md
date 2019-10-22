# neural-turret
Demo of a P300-controlled turret.

## Setting Up

1. Clone this repo locally. 
2. run "npm install"
2. Stream data from the Muse with BlueMuse. Check out how to do that with MuseLSL [here](https://github.com/alexandrebarachant/muse-lsl).
3. Checkout this high level flow chart of how all the pieces interact [here](https://raw.githubusercontent.com/neurotechuoft/MindType/master/Design/FlowChart.png)
4. Clone Neurostack locally from this [repo](https://github.com/neurotechuoft/Neurostack)
    1. run "pip install -r requirements.txt"
    2. Start the Neurostack server by running "python start_server.py". The Neurostack server should be running on localhost:8001
    3. Start the Muse server by running "python start_muse.py". This server should be running on localhost:8002 and be connected to localhost:8001 (Neurostack server)
5. Start the front end application by running "npm start". The application should be running on localhost:3000
6. Start the Desktop application by runnin "npm run electron"

## Developer Notes

- The front end application will not be interacting with Muse directly, but will be interacting with the Neurostack/P300 client.
- The front end is connected to the Muse server (localhost:8002)
- The Muse server receives Muse EEG data through the LSL. You can stream Muse data to this layer using BlueMuse 
- The Muse server streams data to the P300 client (localhost:8001)


**If you are having trouble with any of the steps, please submit an issue or contact us through Slack :)**