import Service from '@glimmerx/service';
import { tracked } from '@glimmer/tracking';

class ButtonModel {
  @tracked count = 123;
}

export default class ButtonListService extends Service {
  buttons = [
    new ButtonModel(),
    new ButtonModel(),
    new ButtonModel(),
  ];
}
