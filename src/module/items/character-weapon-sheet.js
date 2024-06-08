export class STACharacterWeaponSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'item', 'characterweapon'],
      width: 565,
      height: 400,
      tabs: [{navSelector: '.sheet-tabs', contentSelector: '.sheet-body', initial: 'description'}]
    });
  }

  /* -------------------------------------------- */

  // If the player is not a GM and has limited permissions - send them to the limited sheet, otherwise, continue as usual.
  /** @override */
  get template() {
    if ( !game.user.isGM && this.item.limited) {
	        ui.notifications.warn('You do not have permission to view this item!');
      return;
    }
    return `systems/sta/templates/items/character-weapon-sheet.html`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = this.object;
    data.dtypes = ['String', 'Number', 'Boolean'];

    data.ranges = this._createRangeOptions();

    return data;
  }

  /* -------------------------------------------- */

  /** @override */
  setPosition(options = {}) {
    const position = super.setPosition(options);
    const sheetBody = this.element.find('.sheet-body');
    const bodyHeight = position.height - 192;
    sheetBody.css('height', bodyHeight);
    return position;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;
  }

  /**
   * Get the character weapon ranges.
   *
   * @returns {object}  Object with weapon ranges formatted for selectOptions.
   * @protected
   */
  _createRangeOptions() {
    return {
      [game.i18n.localize("sta.actor.belonging.weapon.melee")]: game.i18n.localize("sta.actor.belonging.weapon.melee"),
      [game.i18n.localize("sta.actor.belonging.weapon.ranged")]: game.i18n.localize("sta.actor.belonging.weapon.ranged"),
    };
  }
}
