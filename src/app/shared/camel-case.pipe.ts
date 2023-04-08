import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase',
})
export class CamelCasePipe implements PipeTransform {
  transform(value: string | null, ...args: string[]): string {
    var searchResult = value?.search(/[ _.-]/);
    if (searchResult) {
      var char = value?.charAt(searchResult!);
      return value
        ?.split(/[ _.-]/)
        ?.map((word) => word!.replace(word[0], word[0]?.toUpperCase()))
        .join(char)!;
    }
    return value ? value?.replace(value?.[0], value?.[0].toUpperCase()) : '';
  }
}
