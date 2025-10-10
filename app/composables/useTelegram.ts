export const useTelegram = () => {
  const config = useRuntimeConfig()

  const sendMessage = async (message: string) => {
    const { telegramBotToken, telegramChatIds } = config.public

    if (!telegramBotToken || !telegramChatIds) {
      console.error('Переменные окружения Telegram не установлены в nuxt.config.ts')
      return { success: false, error: 'Переменные окружения Telegram не установлены.' }
    }

    const chatIds = String(telegramChatIds).split(',').map(id => id.trim())
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`

    try {
      const requests = chatIds.map(chatId =>
        $fetch(url, {
          method: 'POST',
          body: {
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
          },
        }),
      )
      
      await Promise.all(requests)
      
      return { success: true }
    }
    catch (error) {
      console.error('Не удалось отправить сообщение в Telegram:', error)
      return { success: false, error }
    }
  }

  return { sendMessage }
}
