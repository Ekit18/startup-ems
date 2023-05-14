import { $chatGptHost } from "..";

export type ChatGPTResponseData = {
    content: string;
    role: string;
}

export const getChatGPTCarQuestionResponse = async (question: string, userCarId:number): Promise<ChatGPTResponseData> => {
    const { data } = await $chatGptHost.post('chat-gpt/send_gpt_car_message', { question, userCarId });
    console.log(data)
    return data;
};
