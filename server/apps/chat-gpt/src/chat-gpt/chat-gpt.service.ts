import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { OpenAIApi, Configuration, CreateCompletionRequest } from "openai";

const DEFAULT_MODEL = "text-davinci-003";
const DEFAULT_TEMPERATURE = 0.5;
const DEFAULT_MAX_TOKENS = 1000;
@Injectable()
export class ChatGptService {
    private readonly openAIApi: OpenAIApi;
    private currentModel?: string;
    private currentTemperature?: number;
    private currentMaxTokens?: number;

    constructor() {
        const configuration = new Configuration({
            organization: process.env.ORGANIZATION_ID,
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openAIApi = new OpenAIApi(configuration);
    }
    setCurrentModel(model: string) {
        if (!model) {
            throw new HttpException("OPENAI WRONG MODEL", HttpStatus.BAD_REQUEST);
        }
        if (model.includes(':')) {
            model.replace(':', "-");
        }
        this.currentModel = model;
    }
    setCurrentTemperature(temperature: number) {
        if (!temperature) {
            throw new HttpException("OPENAI WRONG TEMPERATURE", HttpStatus.BAD_REQUEST);
        }
        this.currentTemperature = temperature;
    }
    setCurrentMaxTokens(maxTokens: number) {
        if (!maxTokens) {
            throw new HttpException("OPENAI WRONG TEMPERATURE", HttpStatus.BAD_REQUEST);
        }
        this.currentMaxTokens = maxTokens;
    }
    async listModels() {
        const models = await this.openAIApi.listModels();
        return models.data;
    }
    async getModelAnswer(question: string, useOnceModel?: string, useOnceTemperature?: number, useOnceMaxTokens?: number) {
        try {
            let modelToUse = DEFAULT_MODEL;
            if (this.currentTemperature) {
                modelToUse = this.currentModel;
            }
            if (useOnceModel) {
                modelToUse = this.currentModel;
            }

            let temperatureToUse = DEFAULT_TEMPERATURE;
            if (this.currentTemperature) {
                temperatureToUse = this.currentTemperature;
            }
            if (useOnceTemperature) {
                temperatureToUse = useOnceTemperature;
            }

            let maxTokensToUse = DEFAULT_MAX_TOKENS;
            if (this.currentMaxTokens) {
                maxTokensToUse = this.currentMaxTokens;
            }
            if (useOnceMaxTokens) {
                maxTokensToUse = useOnceMaxTokens;
            }
            const params: CreateCompletionRequest = {
                prompt: question,
                // eslint-disable-next-line no-undefined
                model: modelToUse,
                // eslint-disable-next-line no-undefined
                temperature: temperatureToUse,
                // eslint-disable-next-line camelcase
                max_tokens: maxTokensToUse
            };

            const response = await this.openAIApi.createCompletion(params);
            return response.data;
        } catch (error) {
            throw new HttpException("OPENAI PROMPT ERROR", HttpStatus.BAD_REQUEST);
        }
    }
}
