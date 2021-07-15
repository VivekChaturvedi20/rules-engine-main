export default class RulesListDto {
    id: string = '';
    name: string = '';
    group: string = '';
    active: boolean = false;
    category: string = '';

    constructor(id: string, name: string, group: string, active: boolean, category: string) {
        this.id = id;
        this.name = name;
        this.group = group;
        this.active = active;
        this.category = category;
    }
}
