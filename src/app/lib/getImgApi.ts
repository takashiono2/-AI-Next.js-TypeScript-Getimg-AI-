import axios from 'axios';

type FetchMonsterImgParams = {
  description: string,
  attribute: string
}
export default async function fetchMonsterImg({
  description,
  attribute
}: FetchMonsterImgParams
): Promise<string> {
  const prompt = `A fictional creature inspired by the characteristics of ${description}, designed to resemble a ${attribute} type without directly copying any existing Pokémon. The overall design should incorporate elements that reflect the ${attribute} type, with colors and shapes that emphasize its nature. Ensure the creature appears whimsical and imaginative, with no direct resemblance to any existing Pokémon.`;
  const options = {
    method: 'POST',
    url: 'https://api.getimg.ai/v1/flux-schnell/text-to-image',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GETIMG_API_KEY}`,
    },
    data: { prompt, steps: 1, response_format: 'url' }
  };
  debugger;
  try {
    const response = await axios.request(options);
    return response.data.url || '';
  } catch (error) {
    console.error('画像発生にエラーが生じました', error);
    return '';
  }
}
