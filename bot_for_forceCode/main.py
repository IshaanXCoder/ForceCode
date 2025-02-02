# import discord
# from discord.ext import commands
# import json
# import asyncio
# from flask_cors import CORS
# import sys
# import signal
# from multiprocessing import Process

# from flask import Flask,request,jsonify

# app = Flask(__name__)
# CORS(app)

# @app.route('/getUpdates',methods=['POST'])
# def getUpdates():
#     if request.method== 'POST':
#         data = request.data
#         data=  json.loads(data)
#         try:
#             handle_codeforces_event(data)
#             return jsonify({
#                 "status": 200,
#                 "message": "successs"
#             })
#         except Exception as e:
#             return jsonify({
#                 "status": 500,
#                 "message":f"internal server error: {e}"
#             })

# def run_flask():
#     # Run Flask on port 5000
#     app.run(port=5000)

# def signal_handler(sig, frame):
#     print("\nShutting down...")
#     sys.exit(0)

# # Discord Bot Setup
# bot_token = ""
# intents = discord.Intents.default()

# bot = commands.Bot(command_prefix="!", intents=intents)

# async def handle_codeforces_event(message):
#     try:
#         data = json.loads(message)
#         user_id = int(data["user_id"])  # Convert to int since Discord IDs are integers
#         problem = data["problem"]
#         print('got a request')
#         user = await bot.fetch_user(user_id)
#         await send_dm(user_id, f"Congratulations user: {user.name} has solved {problem}")
#     except Exception as e:
#         print(f"Failed to process message: {e}")

# async def send_dm(user_id: int, message: str):
#     try:
#         print('got a dm request')
#         user = await bot.fetch_user(user_id)
#         if user:
#             await user.send(message)
#             print('done succesfully')
#         else:
#             print(f"User {user_id} not found.")
#     except Exception as e:
#         print(f"Error sending DM: {e}")

# @bot.event
# async def on_ready():
#     print(f"Bot logged in as {bot.user}")

# async def runhtml():
#     while True:
#         # Example message as a string since json.loads expects a string
#         test_message = json.dumps({
#             "user_id": "744901615919562813",
#             "problem": "Three sum(linked list version)"
#         })
#         await handle_codeforces_event(test_message)
#         await asyncio.sleep(2)

# async def main():
#     try:
#         # Create a task for runhtml since bot.start() blocks
        
#         # Run the bot and html task together
#         await bot.start(bot_token)
        
#     except Exception as e:
#         print(f"An error occurred: {e}")

# if __name__ == '__main__':
#     signal.signal(signal.SIGINT, signal_handler)
#     flask_process = Process(target=run_flask)
#     flask_process.start()
#     try:
#         asyncio.run(main())  # Note: main() not main
#     except KeyboardInterrupt:
#         print("Shutting down the program....")
#         flask_process.terminate()
#         flask_process.join()
#         sys.exit(0)

import discord
from discord.ext import commands
import json
import asyncio
from flask_cors import CORS
import sys
import signal
from multiprocessing import Process
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)

# Create a new event loop for the Flask process
flask_loop = asyncio.new_event_loop()

@app.route('/getUpdates', methods=['POST'])
def getUpdates():
    if request.method == 'POST':
        data = request.data
        data = json.loads(data)
        try:
            # Run the async function in the event loop
            flask_loop.run_until_complete(handle_codeforces_event(data))
            return jsonify({
                "status": 200,
                "message": "success"
            })
        except Exception as e:
            return jsonify({
                "status": 500,
                "message": f"internal server error: {e}"
            })

def run_flask():
    # Set the event loop for this process
    asyncio.set_event_loop(flask_loop)
    app.run(port=5000)

def signal_handler(sig, frame):
    print("\nShutting down...")
    sys.exit(0)

# Discord Bot Setup
bot_token = "MTMzNDk2ODAyNDg1MTE1MzAxNw.Gl-cJ-.VT-H1X_4iya_WfUpWRmKofXbAOqbPTVY-a_uv4"
intents = discord.Intents.default()
bot = commands.Bot(command_prefix="!", intents=intents)

async def handle_codeforces_event(data):
    try:
        user_id = int(data["user_id"])
        problem = data["problem"]
        print('got a request')
        # Create a new bot instance for the Flask process
        async with discord.Client(intents=intents) as client:
            await client.login(bot_token)
            user = await client.fetch_user(user_id)
            await send_dm(user, f"Congratulations user: {user.name} has solved {problem}")
    except Exception as e:
        print(f"Failed to process message: {e}")
        raise e

async def send_dm(user, message: str):
    try:
        print('got a dm request')
        if user:
            await user.send(message)
            print('done successfully')
        else:
            print(f"User {user.id} not found.")
    except Exception as e:
        print(f"Error sending DM: {e}")
        raise e

@bot.event
async def on_ready():
    print(f"Bot logged in as {bot.user}")

async def main():
    try:
        await bot.start(bot_token)
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    signal.signal(signal.SIGINT, signal_handler)
    flask_process = Process(target=run_flask)
    flask_process.start()
    
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Shutting down the program....")
        flask_process.terminate()
        flask_process.join()
        sys.exit(0)