import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatGptService } from './chat_gpt.service';
import { GetModelAnswerDTO } from './dto/get-model-answer.dto';
import { SetMaxTokensDTO } from './dto/set-max-tokens.dto';
import { SetModelDTO } from './dto/set-model.dto';
import { SetTemperatureDTO } from './dto/set-temperature.dto';

@Controller('chat-gpt')
export class ChatGptController {
    constructor(private chatGptService: ChatGptService) { }

    @Post("/send_ai_message")
    getModelAnswer(@Body() prompt: GetModelAnswerDTO) {
        const modelParam = prompt.useOncemodel
            ? prompt.useOncemodel
            : null;
        const tempParam = prompt.useOnceTemperature
            ? prompt.useOnceTemperature
            : null;
        const maxTokensParam = prompt.useOnceMaxTokens
            ? prompt.useOnceMaxTokens
            : null;
        return this.chatGptService.getModelAnswer(prompt.question, modelParam, tempParam, maxTokensParam);
    }
    @Get("/list_models")
    listModels() {
        return this.chatGptService.listModels();
    }
    @Post("/set_ai_model")
    setModel(@Body() model: SetModelDTO) {
        this.chatGptService.setCurrentModel(model.model);
    }
    @Post("/set_ai_temperature")
    setTemperature(@Body() temperature: SetTemperatureDTO) {
        this.chatGptService.setCurrentTemperature(temperature.temperature);
    }
    @Post("/set_ai_max_tokens")
    setMaxTokens(@Body() maxTokens: SetMaxTokensDTO) {
        this.chatGptService.setCurrentMaxTokens(maxTokens.maxTokens);
    }
}
