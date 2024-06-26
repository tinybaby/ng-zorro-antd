import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterList } from '../router';

@Component({
  selector: 'app-side',
  template: `
    <ul nz-menu [nzMode]="'inline'" class="aside-container menu-site" [nzInlineIndent]="40" [class.ant-menu-rtl]="direction === 'rtl'">
      <ng-container *ngIf="page === 'docs'">
        <li *ngFor="let intro of routerList.intro" nz-menu-item nzMatchRouter [hidden]="intro.language !== language || intro.hidden">
          <a routerLink="{{ intro.path }}">{{ intro.label }}</a>
        </li>
      </ng-container>

      <ng-container *ngIf="page === 'components'">
        <li nz-menu-item nzMatchRouter>
          <a routerLink="components/overview/{{ language }}">
            <span *ngIf="language === 'en'">Components Overview</span>
            <span *ngIf="language === 'zh'">组件总览</span>
          </a>
        </li>

        <li nz-menu-group *ngFor="let group of routerList.components" [hidden]="group.language !== language" [nzTitle]="group.name">
          <ul>
            <ng-container>
              <li nz-menu-item nzMatchRouter *ngFor="let component of group.children">
                <a class="menu-title-content-link" [routerLink]="component.path">
                  <span>
                    {{ component.label }}
                    <span class="chinese">{{ component.zh }}</span>
                  </span>
                  <span class="ant-tag ant-tag-success ant-tag-borderless" *ngIf="!!component.tag">{{ component.tag }}</span>
                </a>
              </li>
            </ng-container>
          </ul>
        </li>
      </ng-container>

      <ng-container *ngIf="page === 'experimental'">
        <li
          nz-menu-group
          *ngFor="let group of routerList.components"
          [hidden]="group.language !== language || group.experimentalChildren.length === 0"
          [nzTitle]="group.name"
        >
          <ul>
            <ng-container>
              <li nz-menu-item nzMatchRouter *ngFor="let component of group.experimentalChildren">
                <a class="menu-title-content-link" [routerLink]="component.path">
                  <span>
                    {{ component.label }}
                    <span class="chinese">{{ component.zh }}</span>
                  </span>
                  <span class="ant-tag ant-tag-warning ant-tag-borderless" *ngIf="!!component.tag">{{ component.tag }}</span>
                </a>
              </li>
            </ng-container>
          </ul>
        </li>
      </ng-container>
    </ul>
  `,
  styleUrl: './side.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideComponent {
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @Input() page: 'docs' | 'components' | 'experimental' | string = 'docs';
  @Input() routerList: RouterList = {} as RouterList;
  @Input() language: 'zh' | 'en' = 'en';
}
