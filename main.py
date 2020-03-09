import discord
from discord.ext import commands, tasks
import requests, json
client = commands.Bot(command_prefix = '$');

idChannelNews = 123 #ID Channel 
TOKEN = '' #TOKEN BOT


    
'''---------------------- Embed bind $help -------------------------------------'''
embed = discord.Embed(title="***MỘT SỐ THỨ BẠN CẦN BIẾT VỀ CON BOT NÀY***", colour=discord.Colour(0x20a9b4), description="Rush B là 1 discord bot được phát triển bởi 1 member ISPTIT CLUB\n\n *Nhằm phục vụ một số những mục đích cơ bản như thông báo có thành viên mới, thành viên rời đi, đưa một số tin tức liên quan đến game và công nghệ....*\n\n \n\nDonate me: 0973674820 (Momo, Airpay)")
embed.set_author(name="Rush B", url="https://discordapp.com/api/oauth2/authorize?client_id=684221830315376707&permissions=383040&scope=bot", icon_url="https://cdn.discordapp.com/avatars/684221830315376707/d4c2d548943916731b5e5fbe169edf95.png?size=32")
embed.set_footer(text="made by hỵp with love 😘", icon_url="")
'''----------------------                  -------------------------------------'''

@client.event
async def on_ready():
    news.start()
    await client.change_presence(activity=discord.Activity(type=3, name='for new members'))
    print(f'logged in as {client.user}')


r = requests.get('https://news-rush-b.glitch.me/').json()

@tasks.loop(hours=18)
async def news():
    for news_ in r:
      embed_ = await discord.Embed(title=news_.title, colour=discord.Colour(0x20a9b4), url=news_.href)
      embed_.set_image(url=news_.img)
      embed_.set_author(name="Rush B", url="https://discordapp.com/api/oauth2/authorize?client_id=684221830315376707&permissions=383040&scope=bot", icon_url="https://cdn.discordapp.com/avatars/684221830315376707/d4c2d548943916731b5e5fbe169edf95.png?size=32")
      embed_.set_footer(text=news_.dateTime, icon_url="")
      channel = await client.get_channel(id=idChannelNews)    
      await channel.send(embed=embed_)


@client.event
async def on_member_join(member):
    channel = member.guild.text_channels[0]
    await channel.send(f':joy: ***Chào mừng*** {member.mention} bạn đã đến với server của chúng tôi! Hãy dạo một vòng xem server của chúng tôi có gì nhé :wink:')
    await member.send(embed=embed)

@client.event
async def on_member_remove(member):
    channel = member.guild.text_channels[0]
    print(f'{member}')
    await channel.send(f':cry: {member} Đã ra đi không lời từ biệt!')


@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$hello'):
        await message.channel.send(f'Hello! Ping, {message.author.mention} pong `{round(client.latency * 1000)}ms`!')
    if message.content.startswith('$help'):
        await message.channel.send(embed=embed)
        
client.run(TOKEN)
