const getRankDescription = (rank) => {

  switch(rank)
  {
    case 'A':
      return 'an ace';

    case '2':
      return 'a two';

    case '3':
      return 'a three';

    case '4':
      return 'a four';

    case '5':
      return 'a five';

    case '6':
      return 'a six';

    case '7':
      return 'a seven';

    case '8':
      return 'an eight';

    case '9':
      return 'a nine';

    case '10':
      return 'a ten';

    case 'J':
      return 'a jack';

    case 'Q':
      return 'a queen';

    case 'K':
      return 'a king';
  }

}
