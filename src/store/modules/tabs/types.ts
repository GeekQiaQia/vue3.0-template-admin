export default interface tabStateTypes {
  // eslint-disable-next-line semi
  tabsOption: [{ route: String; name: String; title: { [key: string]: String } }]
  currentIndex: String
  breadcrumbList: any[]
}
