import { $chatGptHost } from "..";

export const getChatGPTCarQuestionResponse = async (question: string, userCarId:number): Promise<string> => {
    const { data } = await $chatGptHost.post('chat-gpt/send_gpt_car_message', { question, userCarId });
    console.log(data)
    return data;
};
