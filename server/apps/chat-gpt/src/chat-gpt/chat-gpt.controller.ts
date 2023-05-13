import { Controller, Post, Body, Get } from "@nestjs/common";
import { GetModelAnswerDTO, GetModelCarAnswerDTO, SetModelDTO, SetTemperatureDTO, SetMaxTokensDTO } from "inq-shared-lib";
import { ChatGptService } from "./chat-gpt.service";

const DEFAULT_MODEL_GPT = "gpt-3.5-turbo";
const DEFAULT_MODEL_DAVINCI = "text-davinci-003";
const DEFAULT_TEMPERATURE = 0.5;
const DEFAULT_MAX_TOKENS = 1000;

@Controller('chat-gpt')
export class ChatGptController {
    constructor(private chatGptService: ChatGptService) { }

    @Post("send_gpt_message")
    getModelAnswerGPT(@Body() prompt: GetModelAnswerDTO) {
        const tempParam = prompt.useOnceTemperature
            ? prompt.useOnceTemperature
            : DEFAULT_TEMPERATURE;
        const maxTokensParam = prompt.useOnceMaxTokens
            ? prompt.useOnceMaxTokens
            : DEFAULT_MAX_TOKENS;
        return this.chatGptService.getModelAnswerGPT(prompt.question, DEFAULT_MODEL_GPT, tempParam, maxTokensParam);
    }

    @Post("send_gpt_car_message")
    getModelCarAnswerGPT(@Body() prompt: GetModelCarAnswerDTO) {
        const tempParam = prompt.useOnceTemperature
            ? prompt.useOnceTemperature
            : DEFAULT_TEMPERATURE;
        const maxTokensParam = prompt.useOnceMaxTokens
            ? prompt.useOnceMaxTokens
            : DEFAULT_MAX_TOKENS;
        return this.chatGptService.getModelCarAnswerGPT(prompt.question, prompt.userCarId, DEFAULT_MODEL_GPT, tempParam, maxTokensParam);
    }

    @Post("send_davinci_message")
    getModelAnswerDavinci(@Body() prompt: GetModelAnswerDTO) {
        const tempParam = prompt.useOnceTemperature
            ? prompt.useOnceTemperature
            : DEFAULT_TEMPERATURE;
        const maxTokensParam = prompt.useOnceMaxTokens
            ? prompt.useOnceMaxTokens
            : DEFAULT_MAX_TOKENS;
        return this.chatGptService.getModelAnswerDavinci(prompt.question, DEFAULT_MODEL_DAVINCI, tempParam, maxTokensParam);
    }
    @Get("list_models")
    listModels() {
        return this.chatGptService.listModels();
    }
    @Post("set_ai_model")
    setModel(@Body() model: SetModelDTO) {
        this.chatGptService.setCurrentModel(model.model);
    }
    @Post("set_ai_temperature")
    setTemperature(@Body() temperature: SetTemperatureDTO) {
        this.chatGptService.setCurrentTemperature(temperature.temperature);
    }
    @Post("set_ai_max_tokens")
    setMaxTokens(@Body() maxTokens: SetMaxTokensDTO) {
        this.chatGptService.setCurrentMaxTokens(maxTokens.maxTokens);
    }
}
