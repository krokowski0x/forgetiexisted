import { Page } from 'puppeteer'
import selectors from '../selectors.json'

const deleteFacebookActivity = async (page: Page) => {
    await page.goto(`https://www.facebook.com/${process.env.FACEBOOK_USER_NAME}/allactivity/?activity_history=true&category_key=ALL&manage_mode=true`)

    await page.waitForSelector('i.hu5pjgll.lzf7d6o1', {visible: true})
    await page.click('i.hu5pjgll.lzf7d6o1')
    await page.waitForSelector('div[role="menuitem"]', {visible: true})
    await page.click('div[role="menuitem"]')
    await page.waitForSelector('div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div > div.a8nywdso.ihqw7lf3.rz4wbd8a.jb3vyjys.bkfpd7mw.btwxx1t3.j83agx80 > div > div:nth-child(1) > div.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.nhd2j8a9.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.n00je7tq.arfg74bv.qs9ysxi8.k77z8yql.abiwlrkh.p8dawk7l.lzcic4wl.rq0escxv.pq6dq46d.cbu4d94t.taijpn5t.l9j0dhe7.k4urcfbm > div > div.bp9cbjyn.j83agx80.taijpn5t.c4xchbtz.by2jbhx6.a0jftqn4 > div > span', {visible: true})
    await page.click('div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div > div.a8nywdso.ihqw7lf3.rz4wbd8a.jb3vyjys.bkfpd7mw.btwxx1t3.j83agx80 > div > div:nth-child(1) > div.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.nhd2j8a9.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.n00je7tq.arfg74bv.qs9ysxi8.k77z8yql.abiwlrkh.p8dawk7l.lzcic4wl.rq0escxv.pq6dq46d.cbu4d94t.taijpn5t.l9j0dhe7.k4urcfbm > div > div.bp9cbjyn.j83agx80.taijpn5t.c4xchbtz.by2jbhx6.a0jftqn4 > div > span')

  }