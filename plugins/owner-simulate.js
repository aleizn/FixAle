let handler = async (m, { conn, args: [event], text }) => {
    if (!event) throw `Enliste el evento a simular: welcome, bye, delete, promote, demote`
    let mentions = text.replace(event, '').trimStart()
    let who = mentions ? conn.parseMention(mentions) : []
    let participants = who.length ? who : [m.sender]
    let action = false
    m.reply(`Simulando ${event}...`)
    switch (event.toLowerCase()) {
        case 'add':
        case 'invite':
        case 'welcome':
            action = 'add'
            break
        case 'bye':
        case 'kick':
        case 'leave':
        case 'remove':
            action = 'remove'
            break
        case 'promote':
            action = 'promote'
            break
        case 'demote':
            action = 'demote'
            break
        case 'delete':
            deleted = m
            break
        default:
            throw `Enliste el evento a simular: welcome, bye, delete, promote, demote`
    }
    if (action) return conn.participantsUpdate({
        jid: m.chat,
        participants,
        action
    })
    return conn.onDelete(m)
}
handler.help = ['simulate <event> [@mention]']
handler.tags = ['owner']
handler.command = /^simulate$/i

handler.owner = true

export default handler