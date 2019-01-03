import {
  faDribbble,
  faFreeCodeCamp,
  faGoogle,
  faMedium,
  faReddit,
  faStackOverflow
} from '@fortawesome/free-brands-svg-icons';
import {SearchType} from '../models/search-type.model';

export const searchTypes: SearchType[] = [
  {
    name: 'Google',
    url: 'google.com',
    icon: faGoogle
  },
  {
    name: 'StackOverflow',
    url: 'stackoverflow.com',
    icon: faStackOverflow
  },
  {
    name: 'Dribbble',
    url: 'dribbble.com',
    icon: faDribbble
  },
  {
    name: 'Medium',
    url: 'medium.com',
    icon: faMedium
  },
  {
    name: 'FreeCodeCamp',
    url: 'freecodecamp.org',
    icon: faFreeCodeCamp
  },
  {
    name: 'Reddit',
    url: 'reddit.com',
    icon: faReddit
  },
];

