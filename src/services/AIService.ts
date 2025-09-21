import { streamText} from 'ai'
import { openrouter } from '../lib/ai'

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openrouter('x-ai/grok-4-fast:free'),
            system: 'Eres un bartender que tienes 50 años de experiencia y le sirvio una bebida a James Bond' + 'Solo puedes responder preguntas relacionadas con bebidas',
            temperature: 0.5,
            prompt
        })

        return result.textStream
    }
}