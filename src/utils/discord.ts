const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
// Note: I will use the one found in previous logs if available, but I'll search for it first.

export const sendDiscordMessage = async (message: string) => {
    if (!DISCORD_WEBHOOK_URL) {
        console.warn('Discord Webhook URL is not configured.');
        return;
    }

    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // keepalive true to ensure message sends even if page is closing
            keepalive: true,
            body: JSON.stringify({
                content: message,
                allowed_mentions: { parse: ["everyone", "users", "roles"] }
            }),
        });
    } catch (error) {
        console.error('Error sending Discord message:', error);
    }
};

export const sendDiscordMessageBeacon = (message: string) => {
    if (!DISCORD_WEBHOOK_URL) return;
    try {
        const payload = {
            content: message,
            allowed_mentions: { parse: ["everyone", "users", "roles"] }
        };
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(DISCORD_WEBHOOK_URL, blob);
    } catch (error) {
        console.error('Error sending Discord beacon:', error);
    }
};

export const sendDiscordEntryMessage = async (geo: any, device: string, referrer: string) => {
    if (!DISCORD_WEBHOOK_URL) return;

    const countryStr = typeof geo.country === 'string' ? geo.country.toLowerCase() : 'unknown';
    const isLebanon = countryStr.includes('lebanon') || countryStr === 'lb';
    const mention = isLebanon ? '@everyone ' : '';

    const message = `${mention}🚀 **New Visitor Entered**
🌍 **Location:** ${geo.city || 'Unknown'}, ${geo.region || 'Unknown'}, ${geo.country || 'Unknown'}
🏢 **Network:** ${geo.organization || 'Unknown'}
💻 **Device:** ${device}
🔍 **Source:** ${referrer}
📊 [Open Admin Dashboard](https://laserartlb.com/#admin)`;

    return sendDiscordMessage(message);
};
