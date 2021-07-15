export default class CreateRuleDto {
    name: string = '';
    group: string = '';
    active: boolean = true;
    category: string = '';

    constructor(name: string, group: string, active: boolean, category: string) {
        this.name = name;
        this.group = group;
        this.active = active;
        this.category = category;
    }
}
