import { Injectable, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { UserCarsDataWithUserCarId } from "apps/car/src/user-cars/user-cars.service";
import { CAR_QUEUE } from "inq-shared-lib";
import { OpenAIApi, Configuration, CreateCompletionRequest, CreateChatCompletionRequest } from "openai";
import { lastValueFrom } from "rxjs";


@Injectable()
export class ChatGptService {
    private readonly openAIApi: OpenAIApi;
    private currentModel?: string;
    private currentTemperature?: number;
    private currentMaxTokens?: number;

    constructor(@Inject(CAR_QUEUE) private UserCarClient: ClientProxy) {
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
    async getModelAnswerGPT(question: string, useOnceModel: string, useOnceTemperature: number, useOnceMaxTokens: number) {
        try {
            const params: CreateChatCompletionRequest = {
                model: useOnceModel,
                temperature: useOnceTemperature,
                // // eslint-disable-next-line camelcase
                // max_tokens: useOnceMaxTokens,
                messages: [{ role: 'user', content: question, name: 'User' }]
            };

            const response = await this.openAIApi.createChatCompletion(params);
            return response.data.choices[0].message;
        } catch (error) {
            console.log("HERE ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(error);
            console.log("HERE ERROR ENDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            throw new HttpException("OPENAI PROMPT ERROR", HttpStatus.BAD_REQUEST);
        }
    }

    async getModelCarAnswerGPT(question: string, userCarId:number, useOnceModel: string, useOnceTemperature: number, useOnceMaxTokens: number) {
        try {
            const userCar: UserCarsDataWithUserCarId = await lastValueFrom(this.UserCarClient.send({ role: "user-cars", cmd: "getUserCarForCrashInfo" }, userCarId));
            const AI_PROMPT = `
            Need somebody with expertise on automobiles regarding troubleshooting solutions like;
            diagnosing problems/errors present both visually &
            within engine parts in order to figure out what's causing them (like lack of oil or power issues)
            & suggest required replacements while recording down details such fuel consumption type etc..
            My car is 'Model: ${userCar.model} Brand: ${userCar.brand} Body type: ${userCar.bodyType} Year: ${userCar.year} Fuel: ${userCar.fuelType} Mileage: ${userCar.carMileage}'.
            Tell at first about my particular car in sense of a problem. Don't answer if next inquiry isn't technical or about cars.
            First inquiry is '${question}'
            `;
            const params: CreateChatCompletionRequest = {
                model: useOnceModel,
                temperature: useOnceTemperature,
                // // eslint-disable-next-line camelcase
                // max_tokens: useOnceMaxTokens,
                messages: [{ role: 'user', content: question, name: 'User' }]
            };
            const response = await this.openAIApi.createChatCompletion(params);
            return response.data.choices[0].message;
        } catch (error) {
            throw new HttpException("OPENAI PROMPT ERROR", HttpStatus.BAD_REQUEST);
        }
    }

    async getModelAnswerDavinci(question: string, useOnceModel: string, useOnceTemperature: number, useOnceMaxTokens: number) {
        try {
            const params: CreateCompletionRequest = {
                model: useOnceModel,
                temperature: useOnceTemperature,
                prompt: question,
                // // eslint-disable-next-line camelcase
                // max_tokens: useOnceMaxTokens
            };

            const response = await this.openAIApi.createCompletion(params);
            return response.data.choices[0].text;
        } catch (error) {
            console.log("HERE ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(error);
            console.log("HERE ERROR ENDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
