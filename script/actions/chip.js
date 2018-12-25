import DialogManager from '../DialogManager';

export default async function chip(message, skipConfirm)
{
  if(Array.isArray(message))
  {
    for(let i = 0; i < message.length; i++)
    {
      await DialogManager.outputMessage(message[i], skipConfirm);
    }
    return;
  }

  await DialogManager.outputMessage(message, skipConfirm);
}
