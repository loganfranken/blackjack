import DialogManager from '../DialogManager';
import { isFunction } from '../Utility';

export default async function chip(message, skipConfirm)
{
  if(isFunction(message))
  {
    await message();
    return;
  }

  if(Array.isArray(message))
  {
    for(let i = 0; i < message.length; i++)
    {
      if(isFunction(message[i]))
      {
        await message[i]();
      }
      else
      {
        await DialogManager.outputMessage(message[i], skipConfirm);
      }
    }
    return;
  }

  await DialogManager.outputMessage(message, skipConfirm);
}
