import type { MessageEntity } from "grammy/types";

export enum PozdravokEmoji {
    DOBRYACHOK = 'DOBRYACHOK',
    SHY_DOBRYACHOK = 'SHY_DOBRYACHOK',
    VICTORY_DOBRYACHOK = 'VICTORY_DOBRYACHOK',
    CRY_DOBRYACHOK = 'CRY_DOBRYACHOK',
    NEUMYOHA_DOBRYACHOK = 'NEUMYOHA_DOBRYACHOK',
    STERN_DOBRYACHOK = 'STERN_DOBRYACHOK',
    WAVING_DOBRYACHOK = 'WAVING_DOBRYACHOK'
}

export const POZDRAVOK_EMOJI_PLACEHOLDERS: Record<PozdravokEmoji, string> = {
    [PozdravokEmoji.DOBRYACHOK]: '🥳',
    [PozdravokEmoji.SHY_DOBRYACHOK]: '☺️',
    [PozdravokEmoji.VICTORY_DOBRYACHOK]: '✌️',
    [PozdravokEmoji.CRY_DOBRYACHOK]: '😭',
    [PozdravokEmoji.NEUMYOHA_DOBRYACHOK]: '🤬',
    [PozdravokEmoji.STERN_DOBRYACHOK]: '😏',
    [PozdravokEmoji.WAVING_DOBRYACHOK]: '👋'
}

export const POZDRAVOK_EMOJI_CODES: Record<PozdravokEmoji, string> = {
    [PozdravokEmoji.DOBRYACHOK]: '5404816678129273732',
    [PozdravokEmoji.SHY_DOBRYACHOK]: '5364196526711119229',
    [PozdravokEmoji.VICTORY_DOBRYACHOK]: '5364310669761976922',
    [PozdravokEmoji.CRY_DOBRYACHOK]: '5363821039195264988',
    [PozdravokEmoji.NEUMYOHA_DOBRYACHOK]: '5363813939614327183',
    [PozdravokEmoji.STERN_DOBRYACHOK]: '5379619324774326601',
    [PozdravokEmoji.WAVING_DOBRYACHOK]: '5258029071207505708'
};

export function getEmojiEntity(emoji: PozdravokEmoji, offset = 0, length = 2): MessageEntity {
    return {
        type: "custom_emoji",
        offset,
        length,
        custom_emoji_id: POZDRAVOK_EMOJI_CODES[emoji],
    }
}
