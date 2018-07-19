export const getRedirectPath = (obj)=>{
    //根据用户信息 返回跳转地址
    //user.type /boss  /genius
    //user.avatar /bossinfo  /geniusinfo
    let url = (obj.type==='boss')?'/boss':'/genius';
    if (!obj.avatar){
        url += 'info'
    }
    return url;
}
export const baseUrl = 'localhost:8080'

export const getChatId = (userId, targetId) => {
    return [userId, targetId].sort().join('_')
}

export const emojiStr='😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👶 👦 👧 👨 👩 👴 👵 👨‍⚕️ 👩‍⚕️ 👨‍🎓 👩‍🎓 👨‍⚖️ 👩‍⚖️ 👨‍🌾 👩‍🌾 👨‍🍳 👩‍🍳 👨‍🔧 👩‍🔧 👨‍🏭 👩‍🏭 👨‍💼 👩‍💼 👨‍🔬 👩‍🔬 👨‍💻 👩‍💻 👨‍🎤 👩‍🎤 👨‍🎨 👩‍🎨 👨‍✈️ 👩‍✈️ 👨‍🚀 👩‍🚀 👨‍🚒 👩‍🚒 👮 🕵 💂 👷 🤴 👸 👳 👲 🧕 🧔 👱 🤵 👰 🤰 🤱 👼 🎅 🤶 🧙‍ 🧚‍ 🧛‍ 🧜‍ 🧝‍ 🧞‍ ‍🙍 🙎 🙅 🙆 💁 🙋 🙇 🤦 🤷 🤷‍♂️ 🤷‍♀️ 💆 💇 🚶 🏃 💃 🕺 👯 🧖‍ 🕴 🗣 👤 👥 👫 👬 👭 🤳 💪 👈 👉 ☝ 👆 🖕 👇 ✌ 🤞 🖖 🤘 🖐 ✋ 👌 👍 👎 ✊ 👊 🤛 🤜 🤚 👋 🤟 ✍ 👏 👐 🙌 🤲 🙏 🤝 💅 👂 👃 👣 👀 👁 🧠 👅 👄 💋 👓 🕶 👔 👕 👖 🧣 🧤 🧥 🧦 👗 👘 👙 👚 👛 👜 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 🧢 ⛑ 💄 💍 🌂 ☂ 💼 😃 🐻';