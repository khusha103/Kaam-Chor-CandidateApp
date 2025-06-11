export interface CalendarComponentOptions {
    from?: Date | string;
    to?: Date | string;
    pickMode?: 'single' | 'range' | 'multi';
    weekStart?: number;
    disableWeeks?: number[];
    monthFormat?: string;
    titleFormat?: string;
    color?: string;
    weekdays?: string[];
    daysConfig?: Array<{
      date: Date;
      disable?: boolean;
      subTitle?: string;
      cssClass?: string;
    }>;
    showToggleButtons?: boolean;
    showMonthPicker?: boolean;
    defaultScrollTo?: Date;
    defaultDate?: Date;
    defaultDates?: Date[];
    defaultDateRange?: { from: Date; to: Date };
    defaultTitle?: string;
    defaultSubtitle?: string;
    [key: string]: any;
  }